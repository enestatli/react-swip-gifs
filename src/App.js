import React, {useState, useEffect} from 'react';
import './App.css';
import Swiper from 'react-id-swiper';

const VerticalSlider = ({ data }) => {
  //console.log(data)
/*  const params = {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30,
    autoplay: true,
  };*/

  const Slide = ({ item }) => (
    <div className="swiper-slide">
      <img src={item.data.url} alt={item.data.title} width="500px" />
    </div>
  )

  const SlideMapper = items => {
    return items
      .filter(item => {
        if (item.data.domain === "i.redd.it") {
          return true;
        }
        return false;
      })
      .map((item, index) => <Slide key={index} item={item} />);
  };
  return <Swiper >{SlideMapper(data)}</Swiper>;
};


function App() {

  const url = "https://www.reddit.com/r/pics/.json"
  const [data, setData] = useState([])

  const fetchItems = async () => {
    const result = await (await fetch(url)).json()
    setData(result.data.children)
    //console.log(result)
    //result.data.children[11].data.preview.reddit_video_preview.fallback_url
  }

  useEffect(() => {
      fetchItems()
  }, [])


  return (
    <div className="App">
      <h1>Hello, this is a test title</h1>
      <h2>Please wait to see some magic happens!</h2>
      <div className="container">
        <VerticalSlider data={data} />
      </div>
    </div>
  );
}

export default App;