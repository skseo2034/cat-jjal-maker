import './App.css';
import React from 'react';
import axios from 'axios';
import Title from "./components/Title";

const jsonLocalStorage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
};

const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const fetchCat2 = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    try {
        const responseJson2 = await axios({
            method: 'get',
            url: `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`,
            // responseType: 'json'
        });

        return `${OPEN_API_DOMAIN}/${responseJson2.data.url}`; // responseJson2.data.url
    } catch (error) {
        console.log(error.message, error.errorCode);
    }

};

function CatItem(props) {
    return (
        <li>
            <img src={props.img} style={{width: '150px'}}/>
        </li>
    );
}

function Favorites({favorites}) {
    if (favorites.length == 0) {
        return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
    }

    return (
        <ul className="favorites">
            {favorites.map((cat) =>
                (
                    <CatItem img={cat} key={cat}/>
                ))}
        </ul>
    );
}

const MainCard = ({img, onHeartClick, alreadyFavorite}) => {
    const heartIcon = alreadyFavorite ? "💖" : "🤍";
    return (
        <div className="main-card">
            <CatItem img={img} alt="고양이"/>
            <button onClick={onHeartClick}>{heartIcon}</button>
        </div>
    )
}


const Form = ({updateMainCat}) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessager] = React.useState('');

    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMessager('');
        if (includesHangul(userValue)) {
            setErrorMessager('한글은 입력할 수 없습니다.');
            return;
        }

        setValue(e.target.value.toUpperCase());
    }

    function handleFormSumit(e) {
        e.preventDefault();
        if (value === '') {
            setErrorMessager('빈 값으로 만들 수 없습니다.');
        } else {
            setErrorMessager('');
        }

        updateMainCat(value);
    }

    return (
        <form onSubmit={handleFormSumit}>
            <input type="text" name="name" placeholder="영어 대사를 입력해주세요"
                   value={value}
                   onChange={handleInputChange}/>
            <button type="submit">생성</button>
            <p style={{color: "red"}}>{errorMessage}</p>
        </form>
    );
}


const App = () => {
    const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
    const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
    const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

    const [counter, setCounter] = React.useState(() => {
        return jsonLocalStorage.getItem("counter");
    });

    const [mainCat, setMainCat] = React.useState(CAT1);//cataas.com/cat/60b73094e04e18001194a309/says/react");

    const [favorites, setFavorites] = React.useState(() => {
        return jsonLocalStorage.getItem("favorites") || [];
    });

    const alreadyFavorite = favorites.includes(mainCat);

    async function setInitialCat() {
        const newCat = await fetchCat('First cat');
        setMainCat(newCat);
    }

    React.useEffect(() => {
        setInitialCat();
    }, []);


    async function updateMainCat(inpuText) {
        const newCat = await fetchCat(inpuText);
        //const newCat2 = await fetchCat2('test2');
        //setMainCat(newCat2);
        setMainCat(newCat);

        setCounter((prev) => {
            const nextCounter = prev + 1;
            jsonLocalStorage.setItem("counter", nextCounter);
            return nextCounter;
        });

    }

    function handelHeartClick() {
        const nextFavorites = [...favorites, mainCat];
        setFavorites(nextFavorites);
        jsonLocalStorage.setItem("favorites", nextFavorites);
    }

    const counterTitle = !counter ? '' : counter + '번째 ';

    return (
        <div>
            <Title>{counterTitle} 고양이 가라사대</Title>
            <Form updateMainCat={updateMainCat}/>
            <MainCard img={mainCat} onHeartClick={handelHeartClick} alreadyFavorite={alreadyFavorite}/>
            <Favorites favorites={favorites}/>
        </div>
    );
}

export default App;
