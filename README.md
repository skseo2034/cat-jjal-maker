## 리액트 기초 정리

### 컴포넌트

    - 웹사이트를 보면 반복되는 요소 즉, 페이지네이션(1,2,3..), 버튼, 링크, 카드(이미지, 내용, 링크) 이런것들이 컴포넌트 이다.
    - 때에 따라서 컨텐츠만 넘기면 일관적인 UI 를 보여 줄수 있다.
    - 팀 개발시 다른사람이 개발한 컴포너트를 가져다 사용하면 시간 절약 뿐아니라, 웹사이트 전제적으로 일관된 UI 를 가져 갈 수 있다.
    - 카드모양 참고 사이트 : [서핏] https://www.surfit.io/
    - 컨포넌트 참고 사이트 : ant.design 여기에 만들어 놓은 컴포넌트를 가져다 사용하면 된다.
    - 컨포넌트는 React 에서 함수를 사용해서 만들수 있다.
    - 리액트에서 함수에 인자로 넘기는 것을 pros 라고 부른다.
    - 태그 안에 넘긴 props 는 children 으로 넘어 온다.
    - es6+ 의 Destructuring assignment(구조 분해 할당) 을 활용하면 props 를 사용하지 않고 그대로 값을 넘길 수 있다.

Link: [서핏][서핏링크], [ant.design][ant링크]

[서핏링크]: https://www.surfit.io/

[ant링크]: https://ant.design/

```
  ## html에 컨포넌트 코딩 예시
  function Card(titel, desc) { // html 을 반환
    return (
            <div>
              <h2>{title}</h2>
              {desc}
            </div>
    );
  }

  Card('리액트 짱', '리액트 입니다'); //이렇게 호출 할 수있다.
  Card('리액트 싫어요', '리액트 싫어요 입니다');

  <Card title="리액트 짱2" desc="리액트 입니다2"/>  // 리액트가 좋은게 이렇게 호출 가능하다.
  <Card title="리액트 싫어요2" desc="리액트 싫어요 입니다2"/>
```

```
    ## 리액트 함수 인자 예시
    function CatItem(props) {
        console.log(props); 
        // 실제 콘솔에는 
        // {img: 'https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn'}
        // {img: 'https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript'}
        // 데이터가 넘어 온다.
         
        return (
            <li>
                <img src={props.img}/> // 넘어온 인자를 받아 처리 한다.
            </li>
        );
    }

    const favorites = (
        <ul className="favorites">
            <CatItem img="https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn"/> // CatItem 컴포넌트에 인자 넘기기
            <CatItem img="https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript"/>
        </ul>
    );

```

```
    ## 태그안에 props 로 넘긴 예시
    const Title = (props) => {
        console.log(props);
        // 콘솔로그는 아래 처럼 찍힌다.
        // Object
        //  children: "1번째 고양이 가라사대"
        //      [[Prototype]]: Object
        
        return (
            <h1>{props.children}</h1>
        );
    }
    
    const app = (
        <div>
            <Title>1번째 고양이 가라사대</Title> // 태그안에 props 를 넘긴다.
            {form}
            <MainCard/>
            <Favorites/>
        </div>
    )

```

```
    ## es6+ 의 Destructuring assignment(구조 분해 할당) 예시
    const MainCard = ({img}) => { // props 없이 값을 바로 받음
        return (
            <div className="main-card">
                <CatItem img={img} alt="고양이" width="400"/> // props.img  대신 img 를 바로 사용
                <button>🤍</button>
            </div>
        )
    }
    
    const app = (
        <div>
            <Title>1번째 고양이 가라사대</Title>
            <Title>2번째 고양이 가라사대</Title>
            <Form/>
            <MainCard img="https://cataas.com/cat/60b73094e04e18001194a309/says/react"/> // img 를 props 으로 넘김
            <Favorites/>
        </div>
    )
```

