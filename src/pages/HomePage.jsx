import darth from '../images/darthVader.jpeg'; 

const HomePage = () => {
	return (
		<div className="home-page">
			<h1>Welcome to Star Wars Encyclopedia!</h1>
			<img src={darth} alt="Darth Vader" />
			
		</div>
	)
}

export default HomePage