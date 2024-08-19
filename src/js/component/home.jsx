import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import "../../styles/index.css"


const Home = () =>{

	const [nameValue, setNameValue] = useState("")
	const [usersList, setUsersList] = useState([])
	const [switchGetList, setSwitchGetList] = useState(false)
	const [tasksList, setTasksList] = useState([])
	const [task, setTask] = useState("")
	const [editingTaskId, setEditingTaskId] = useState("")

	
	const createUser = () => {
		if(nameValue === ""){
			return
		}

		fetch(`https://playground.4geeks.com/todo/users/${nameValue}`,{
			method: "POST",
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.name){
				setSwitchGetList(prev => !prev)
				setNameValue("")
			}
		})

	}

	const deleteUser = () => {
		fetch(`https://playground.4geeks.com/todo/users/${nameValue}`,{
			method: "DELETE",
		})
		.then((response) =>{
			if(response.ok){
				setSwitchGetList(prev => !prev)
				setNameValue("")
			}
		})
		
	}

	const getTasksListFromUser = () => {
		fetch(`https://playground.4geeks.com/todo/users/${nameValue}`)
		.then((response) => response.json())
		.then((data) => {
			setTasksList(data.todos)
		})
	}

	

	const getUsersList = () => {
		fetch("https://playground.4geeks.com/todo/users")
		.then((response) => response.json())
		.then((data) => {
			setUsersList(data.users)
		})
	}

	const createNewTask = (e) => {
		if(e.key === "Enter"){
			fetch(`https://playground.4geeks.com/todo/todos/${nameValue}`,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
						"label": task,
						"is_done": false
				})
			})
			.then((response) => response.json())
			.then((data) => {
				if(data.label){
					setTasksList([...tasksList, data])
					setTask("")
				}
			})
		}else{
			return
		}
	}

	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
			method: "DELETE",
		})
		.then((response) =>{
			console.log(response)
			if(response.ok){
				let listaFiltrada = tasksList.filter((item)=>item.id !== id)
				setTasksList(listaFiltrada)
			}
		})
		
	}


	const handleEditClick = (item) => {
		setTask(item.label)
		setEditingTaskId(item.id)
	};

	const editTask = () => {
			fetch(`https://playground.4geeks.com/todo/todos/${editingTaskId}`,{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
						"label": task,
						"is_done": false
				})
			})
			.then((response) => response.json())
			.then((data) => {
					setTasksList(tasksList.map(item=> item.id !== editingTaskId ? data : item))
					setTask("")
					setEditingTaskId("")
					console.log("Estoy funcionando")
			})
	}
	useEffect(()=>{
		getUsersList()
	}, [switchGetList])

	return(
		<div className="d-flex flex-column justify-content-center align-items-center w-100" style={{height: "100vh"}}>
			<div className="w-75 d-flex flex-column justify-content-center align-items-center">
				<div className="d-flex flex-column justify-content-center align-items-center" style={{width: "100%"}}>
					<h1 className="mt-5" style={{fontSize: "80px", fontFamily: "cursive", color: "#5a1970"}}>Todo List</h1>

					<div  className="d-flex flex-column justify-content-center align-items-center w-100 py-3">
						<div className="w-80">
							<input className="w-100  rounded-3 p-3" style={{height: "30px", border: "solid", borderColor: "#ccb1d5 "}} placeholder="Ingresa el usuario..." onChange={(e) => setNameValue(e.target.value)} value={nameValue}></input>
						</div>
						<div className="d-flex gap-3 pt-2">
							<button className="rounded-3" onClick={createUser}>Crear usuario</button>
							<button className="rounded-3" onClick={deleteUser}>Eliminar usuario</button>
							<button className="rounded-3" onClick={getTasksListFromUser}>Obtener lista</button>
						</div>
						
					</div>
					
				</div>
				
				<div className="d-flex flex-column justify-content-center align-items-center  rounded-3 py-2" style={{backgroundColor: "#bfafc4"}}>
					<h4 style={{fontSize: "30px", fontFamily: "cursive", color: "#83409a"}}>Lista de Usuarios</h4>
					<div className="d-flex flex-wrap gap-3 justify-content-center align-items-center p-2 rounded-3" style={{width: "100%", height: "80px", overflow: "auto", backgroundColor: "#bfafc4"}}>
						{
							usersList.map((item, index)=>{
								return (
									<div key={index} className="rounded-3 px-2 d-flex justify-content-center align-items-center" style={{backgroundColor: "#ffffff"}}>
										<label style={{fontFamily: "cursive", fontSize:"14px"}}><FontAwesomeIcon style={{color:"#9e46bb"}} icon={faUser}/> {item.name}</label>
									</div>
								)
							})
						}
				</div>
				</div>
				
				
			</div>
			
			<div className="w-100 d-flex flex-column justify-content-center align-items-center">
				<h4 className="my-4" style={{fontSize: "50px", fontFamily: "cursive", color: "#bc6dd6"}}>Lista de tareas de: {nameValue}</h4>
				<input className="rounded-top py-4" style={{height: "30px", width:"60%", border: "solid", borderColor: "#ccb1d5 "}} placeholder="Ingresa nueva tarea..." onChange={(e)=> setTask(e.target.value)} value={task} onKeyDown={createNewTask}></input>
				<ul className="rounded-bottom" style={{listStyle:"none",width:"60%", border: "solid",borderColor: "#ccb1d5", backgroundColor:"#9660a9"}}>

				{
					tasksList.map((item) =>{
						return(
								<div key={item.id} className="d-flex justify-content-between align-items-center py-2 pe-4 text-center" >
									<li style={{fontFamily: "cursive", textAlign:"center"}} onClick={()=>handleEditClick(item)}>{item.label}</li>
									<button className="rounded-circle" onClick={() => deleteTask(item.id)}>X</button>
								</div>
						)
					})
				}
				</ul>
			</div>
			
		</div>
	)
}

export default Home