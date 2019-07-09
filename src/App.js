import React, {useState, useEffect} from 'react';
import './App.css';
import Swiper from 'react-id-swiper';

const VerticalSlider = ({ data }) => {
  console.log(data)
  const Slide = ({ item }) => {
    if (item == null) return null;
    return (
      <div>
          {console.log(item)}
      </div>
    );
  };
  const SlideMapper = items => {
    return items
      .filter(item => {
        if (item.data.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
          return true;
        }
        return false;
      })
      .map((item, index) => <Slide key={index} item={item} />);
  };
  return <Swiper>{SlideMapper(data)}</Swiper>;
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
      <VerticalSlider data={data} />
    </div>
  );
}

export default App;