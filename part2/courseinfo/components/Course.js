const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <Total sum={parts.reduce((sum, part) => { return sum + part.exercises }, 0)} />
    </>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course