import { Link } from "react-router-dom";
import Button from "../components/Button";
import background from "../media/background.png";

function Home() {
	return (
		<div className="mx-8 md:mx-24 my-8 md:my-16">
			<h2 className="text-2xl font-bold">Courseload</h2>
			<div className="mt-8 md:mt-24">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-medium">
					Manage your courseload.
				</h1>
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-medium">
					Organize your classes effectively.
				</h1>
			</div>
			<div className="flex flex-wrap mt-4 md:mt-8">
				<div className="md:w-8/12 lg:w-7/12">
					<span className="text-3xl">
						A planning tool to help students spread their classes, ensuring they
						graduate on time while preventing overloading classes
					</span>
					<div className="mt-4 lg:mt-8">
						<Link to="/preferences">
							<Button className="text-4xl">Start Now</Button>
						</Link>
					</div>
				</div>
				<div className="md:w-4/12 lg:w-5/12">
					<img className="mt-8 lg:mt-0" src={background} alt="" />
				</div>
			</div>
		</div>
	);
}

export default Home;
