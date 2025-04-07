import { Link, useLoaderData } from "react-router-dom"

export default function Courses() {
  const careers = useLoaderData()

  return (
    <div className="careers">
      {careers.content.map(career => (
        <Link to={career.id.toString()} key={career.id}>
          <p>{career.title}</p>
          <p>Based in {career.location}</p>
        </Link>
      ))}
    </div>
  )
}

// data loader
export const careersLoader = async () => {
  const res = await fetch('http://localhost:8080/getAllCourses')

  if (!res.ok) {
    throw Error('Could not fetch the list of careers');
  }

  return res.json();
}