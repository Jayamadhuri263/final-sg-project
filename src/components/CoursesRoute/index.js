import { Component } from 'react'
import Context from '../../context/Context'
import Header from '../Header'
import PrimeVideoCard from '../PrimeVideoCard'
import CourseVideoCard from '../CourseVideoCard'
import './index.css'
import CourseVideoDetails from '../CourseVideoDetails'

const primeCourses = [
    {
        id:1,
        title: "Machine Learning",
        price:"Rs 5000/-",
        videoUrl:"https://www.youtube.com/watch?v=7eh4d6sabA0" ,
        thumbnailUrl:"https://www.analyticsvidhya.com/wp-content/uploads/2015/07/robot-1.jpg" ,
        description: "Machine Learning is the core subarea of artificial intelligence. It makes computers get into a self-learning mode without explicit programming. When fed new data, these computers learn, grow, change, and develop by themselves."
    },
    {
        id:2,
        title:"Frontend Development" ,
        price:"Rs 3000/-",
        videoUrl: "https://www.youtube.com/watch?v=a2L8ra2TOMg&list=PL9ooVrP1hQOH2k1SANK5rvq_EAgUKTPoK",
        thumbnailUrl: "https://i.ytimg.com/vi/krQU3vnpVKE/maxresdefault.jpg",
        description: "Front end development is crucial in conveying this branding to customers. It needs to feature the same or similar colors, language, and graphics to help customers easily associate a business's website with their products elsewhere."
    },
    {
        id:3,
        title: "Backend Development",
        price:"Rs 3500/-",
        videoUrl: "https://www.youtube.com/watch?v=GizIGAAWI8c",
        thumbnailUrl:"https://i.ytimg.com/vi/ENpte3HAza4/maxresdefault.jpg" ,
        description: "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website. "
    }
]

const classWiseCourseDetails = [
    {
        id:"3rd-class-videos",
        imageUrl:"https://i.ytimg.com/vi/mFT1_aUwMvo/maxresdefault.jpg",
        name:"3rd class Lecture Videos",
        para:"NCERT Solutions for Class 3 English Book PDF Download · Unit 1 (Good Morning and The Magic Garden) · Unit 2 (Bird Talk and Nina and the Baby Sparrows) ",
    },
    {
        id:"9th-class-videos",
        imageUrl:"https://i.ytimg.com/vi/S5He-BDVQHA/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBt2AwXEr94_cNrHS1sy3Sf9eBFLw",
        name:"9th class Lecture Videos",
        para:"The 9th Class English book moments has a total of 10 chapters with each of the story holding some valuable meaning along with making the language comprehension simpler for the students.        ",
            },
    {
        id:"jee-videos",
        imageUrl:"https://i.ytimg.com/vi/4EhBvDhqZTo/maxresdefault.jpg",
        name:"JEE Lectures Videos",
        para:"JEE is for admission to the National Institutes of Technology (NITs), Indian Institutes of Information Technology (IIITs), and some other colleges designated as centrally funded technical institutes (CFTIs).",
            }
]

class CoursesRoute extends Component {
    state = {searchInput:''}

    onChangeSearchInput = event => {
        this.setState({
          searchInput: event.target.value,
        })
      }
    
      updateSearch = value => {
        this.setState({
          searchInput: value,
        })
      }

    render(){
        const {searchInput} = this.state

        const searchCourseResults = classWiseCourseDetails.filter(each =>
            each.name.toLowerCase().includes(searchInput.toLowerCase()),
        )

        const searchPrimeResults = primeCourses.filter(each =>
            each.title.toLowerCase().includes(searchInput.toLowerCase()),
        )
    
        return(
            <Context.Consumer>
            {value =>{
                const {isDarkTheme} = value 
                const CoursesThemeBg = isDarkTheme ? "dark-courses-bg":"light-courses-bg"
                const primeCoursesHeadingTheme = isDarkTheme ? "dark-course-heading-prime":"light-course-heading-prime"

                return(
                    <>
                    <Header />
                    <div className="input-container-search">
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                        alt="search"
                        className="search-icon"
                        />
                        <input
                        type="search"
                        className="search-input"
                        placeholder="Search Courses"
                        onChange={this.onChangeSearchInput}
                        value={searchInput}
                        />
                    </div>

                    <div className = {`courses-route-container ${CoursesThemeBg}`}>
                        <h1 className={`prime-courses-heading ${primeCoursesHeadingTheme}`}>Exclusive Prime Courses</h1>
                        <ul className="videos-list-container">
                            {searchPrimeResults.map(eachVideo => (
                                <PrimeVideoCard primeCoursesdata = {eachVideo} key={eachVideo.id} updateSearch={this.updateSearch} />
                            ))}
                        </ul>

                        <h1 className={`prime-courses-heading course ${primeCoursesHeadingTheme}`}>Courses</h1>
                        <ul className="videos-list-container">
                            {searchCourseResults.map(eachVideo => (
                                    <CourseVideoCard Coursesdata = {eachVideo} key={eachVideo.id} updateSearch={this.updateSearch} />
                                ))}
                        </ul>
                    </div>

                    
                    </>
                )
            }}
    </Context.Consumer>
        )
    }
}
export default CoursesRoute