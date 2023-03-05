


const useCorres = () => {

  
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1555 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 1554, min: 1182},
      items: 4
    },
    tablet: {
      breakpoint: { max: 1180, min: 894 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 894, min: 599},
      items: 2
    },
    minimobile: {
      breakpoint: { max: 598, min: 0 },
      items: 1
    }
  };


  return {responsive}
   
  
}

export default useCorres