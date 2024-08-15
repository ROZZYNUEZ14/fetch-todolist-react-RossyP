import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

// import "../../styles/index.css"


const Home = () => {

	const [newInput, setNewInput] = useState("");
	const [isHover, setIsHover] = useState(null)
	const [isInput, setIsInput] = useState(false)
	const [dataTasks, setDataTasks] = useState([])
	const [editId, setEditId] = useState()
	const [editLabel, setEditLabel] = useState()


	function obtenerHistorialTareas() {
		fetch(`https://playground.4geeks.com/todo/users/RossyP`, {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json"
		  },
		})
		  .then((response) =>{
			if(response.status === 404){
				creandoUsuario()
			}
			console.log(response)
			 return response.json()
			})
		  .then((data) => {
			console.log(data.todos);
			// setDataTasks(currentData => [...currentData, data.todos]); 
			setDataTasks(currentData => currentData.concat(data.todos))
		  })
		  .catch((error) => console.log(error));
	}
	
	function addTask(e){
		if(e.key === 'Enter' || e.type === 'click'){
			if(editId){
				editarTareas(editId, editLabel)
			}else{
				crearTareas(newInput)
			}
			
			
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
			console.log(data);
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
			console.log(data)
			
		})
		.catch((error) => console.log(error))
	}

	function editarTareas(id, label){
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": label,
				"is_done": true
			})
		})
		.then((response) => response.json())
		.then((data) =>{
			setDataTasks(currentData => 
				currentData.map(task => 
					task.id === id ? { ...task, label: data.label, is_done: data.is_done } : task
				)
			);
			console.log(data)
		})
		.catch((error) => console.log(error))
	}
	

	useEffect(()=>{
		//creandoUsuario()
		obtenerHistorialTareas()
	}, [])
	
	function handleClickEdit(id, label) {
		setEditId(id)
		setEditLabel(label)
	}

	console.log(editId)
	console.log(editLabel)

	function handleChangeEdit(e){
		setEditLabel(e.target.value)
	}

	function handleMouseEnter(id) {
		setIsHover(id)
	}

	function handleMouseLeave() {
		setIsHover(null)
	}

	function handleBlur() {
		setEditId(null)
		setEditLabel('')
	  }
	function handleMouseLeaveInput(){
		setIsInput(false)
	}
	
	function handleMouseEnterInput(){
		setIsInput(true)
	}
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
								<li key={task.id } className="border-bottom p-2 px-5 py-3 text-start d-flex justify-content-between align-items-center fw-lighter fs-3 fst-italic" style={{backgroundColor: isHover === task.id ? 'pink' : 'white',}} onMouseEnter={()=>handleMouseEnter(task.id)} onMouseLeave={handleMouseLeave}>
									{editId === task.id || isInput === true ?(
											<input value={editLabel} onChange={handleChangeEdit} onKeyDown={addTask} onBlur={handleBlur}></input> 
										):(
											<span>{task.label}</span>
										)
									}
									
									
									<div className="d-flex flex-row gap-2 justify-content-center align-items-center">
										<FontAwesomeIcon icon={faFloppyDisk} style={{color: isInput !== null  ? "yellow": "blue"}} onClick={addTask} onMouseEnter={()=>handleMouseEnter(task.id)} onMouseLeave={handleMouseLeaveInput} />	
										<FontAwesomeIcon className="edit-btn" style={{fontSize: "23px", color: isHover === task.id ? "#575458" : "white"}} icon={faPen} onClick={() => handleClickEdit(task.id, task.label)} />
										<FontAwesomeIcon className="delete-btn" style={{color: isHover === task.id ? 'red' : 'white',}}  icon={faX} onClick={() => deleteButton(task.id)} />
										
									</div>
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

// onBlur={() => editarTareas(task.id, task.label)}
export default Home;
