import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [newInput, setNewInput] = useState("");
	const [tasks, setTasks] = useState(["Lavar los servicios", "Bañar al perro", "Practicar mi logica"]);

	

	function addTask(e){
		if(e.key === "Enter"){
			// setTasks([...tasks, newInput])
			setTasks(currentTasks => currentTasks.concat(newInput))
			// setTasks(tasks.concat(newInput))
			setNewInput("");
		}
	}

	function deleteButton(e) {
		if (e.target.classList.contains("delete-btn")) {
            e.target.parentElement.remove();
        }
	}

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="mx-auto w-100 bg-transparent d-flex flex-column p-5 justify-content-center align-items-center ">
				<div>
					<h1>TODO</h1>
				</div>
				<div className="w-50">
					<div className="w-100 p-2 px-5 py-3 border bg-white">
						<input className="w-100 border-0" type="text" name="" id="" placeholder="Ingresa nueva tarea" onChange={(e)=>setNewInput(e.target.value)} onKeyDown={addTask}/>
					</div>
					<div className="w-100 border m-0 p-0">
						<ul className="list-unstyled w-100 bg-primary m-0 p-0" onClick={deleteButton}>
							{tasks.map((task, index)=>(
								<li key={index} className="border-bottom p-2 px-5 py-3 text-start d-flex justify-content-between"><span>{task}</span>
								{/* <span><FontAwesomeIcon className="delete-btn" icon={faX} style={{color: "red"}}/></span> */}
								
									<FontAwesomeIcon className="delete-btn" icon={faX} style={{color: "red"}} onClick={deleteButton}/>
								
								</li>
							))}
						</ul>
					</div>
					<div className="w-100 p-3">
						<p>{tasks.length}</p>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Home;
