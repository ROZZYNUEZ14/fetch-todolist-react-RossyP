import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
// import "../../styles/index.css"


const Home = () => {

	const [newInput, setNewInput] = useState("");
	//const [tasks, setTasks] = useState(["Lavar los servicios", "Bañar al perro", "Practicar mi logica"]);
	const [isHoverRed, setIsHoverRed] = useState(false)
	const [dataTasks, setDataTasks] = useState([])



	console.log(dataTasks)

	function obtenerHistorialTareas() {
		fetch(`https://playground.4geeks.com/todo/todos/RossyP`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify({}) 
		})
		  .then((response) => response.json())
		  .then((data) => {
			console.log("Tareas recibidas:", data);
			setDataTasks(currentData => [...currentData, data]); 
		  })
		  .catch((error) => console.log("Error al obtener el historial de tareas:", error));
	}
	
	function addTask(e){
		if(e.key === 'Enter'){
			crearTareas(newInput)
			// setTasks([...tasks, newInput])
			//setTasks(currentTasks => currentTasks.concat(newInput))
			// setTasks(tasks.concat(newInput))
			e.target.value = "";
		}
	}

	function deleteButton(id) {

		fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setDataTasks(currentTasks => currentTasks.filter((task) => task.id !== id))
		})
		.catch((error) => console.log(error))
	}

	

	function creandoUsuario(){
		fetch(`https://playground.4geeks.com/todo/users/RossyP`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("Usuario creado:", data);
			obtenerHistorialTareas();
		})
	}

	function crearTareas(nuevaTarea){
		fetch(`https://playground.4geeks.com/todo/todos/RossyP`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": nuevaTarea,
				"is_done": false
			  })
		})
		.then((response) => response.json())
		.then((data) =>{
			// setDataTasks(currentData => [...currentData, data]);
			setDataTasks(currentData => currentData.concat(data));
			setIdTarea(data.id)
			setActualTarea(data.label)
			console.log(data)
			
		})
		.catch((error) => console.log(error))
	}


	

	useEffect(()=>{
		creandoUsuario()
		obtenerHistorialTareas()
	}, [])
	
	
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
						{dataTasks.length === 0 ? (
      						<li className="text-center w-100 fw-lighter fs-3 fst-italic " style={{color:"purple"}}>No hay tareas, añadir tareas</li>
    					) : (
							dataTasks.map((task, index) => (task !== "" && (
								<li key={task.id } className="border-bottom p-2 px-5 py-3 text-start d-flex justify-content-between align-items-center fw-lighter fs-3 fst-italic">
									<span>{task.label}</span>
									<FontAwesomeIcon className="delete-btn" icon={faX} onClick={() => deleteButton(task.id)}/>
								</li>
								)
							))
							)}
						</ul>
					</div>
					<div className="w-100 p-3  pb-1">
						<p className="fw-light fst-italic" style={{fontFamily: 'Arial', fontSize:"12px"}}>{dataTasks.length} {dataTasks.length === 1 ? "Item" : "Items"} </p>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Home;
