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
			setNewInput('');
		}
	}

	function deleteButton(index) {
		setTasks(currentTasks => currentTasks.filter((task, i) => i !== index));
	}
	
	// function deleteButton(e) {
	// 	if (e.target.classList.contains("delete-btn")) {
    //         e.target.parentElement.remove();
    //     }
	// }

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="mx-auto w-100 bg-transparent d-flex flex-column p-5 justify-content-center align-items-center ">
				<div>
					<h1 className="fw-lighter fst-italic" style={{ fontSize:"100px", color: "#8038b1"}}>ToDo</h1>
				</div>
				<div className="w-50 bg-white rounded-3" style={{boxShadow: "5px 10px 10px gray"}}>
					<div className="w-100 p-2 px-5 py-3">
						<input className="w-100 border-0 fw-lighter fs-3 fst-italic" style={{outline:"none", color:"#bc7bed"}} type="text" name="" id="" placeholder="Ingresa nueva tarea" onChange={(e)=>setNewInput(e.target.value)} onKeyDown={addTask}/>
					</div>
					<div className="w-100 border m-0 p-0">
						<ul className="list-unstyled w-100 m-0 p-0">
							{tasks.map((task, index)=>(
								<li key={index} className="border-bottom p-2 px-5 py-3 text-start d-flex justify-content-between align-items-center fw-lighter fs-3 fst-italic"><span>{task}</span>
			
									<FontAwesomeIcon className="delete-btn" icon={faX} style={{color: "red"}} onClick={() => deleteButton(index)}/>
								
								</li>
							))}
						</ul>
					</div>
					<div className="w-100 p-3  pb-1">
						<p className="fw-light fst-italic" style={{fontFamily: 'Arial', fontSize:"12px"}}>{tasks.length} {tasks.length === 1 ? "Item" : "Items"} </p>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Home;
