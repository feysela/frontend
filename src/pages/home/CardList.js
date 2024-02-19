
import Card from "./Card";
function CardList({ contents, detailsPageLink}) {
  
    const renderedCourses = contents?.map((content) => {
      return (
        <Card content ={content} key={content.id} id={content.id} detailsPageLink={detailsPageLink}/>
      );
    });
  
    return <div className='list-wrapper'>{renderedCourses}</div>;
  }
  
  export default CardList;
