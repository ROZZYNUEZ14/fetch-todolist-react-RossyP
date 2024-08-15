import React, {useState, useEffect} from "react";



const Home = () =>{

	const [nameValue, setNameValue] = useState("")
	const [usersList, setUsersList] = useState([])
	const [switchGetList, setSwitchGetList] = useState(false)
	const [tasksList, setTasksList] = useState([])
	const [task, setTask] = useState("")

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

	useEffect(()=>{
		getUsersList()
	}, [switchGetList])

	return(
		<div>
			<h1>Todo List</h1>
			<input onChange={(e) => setNameValue(e.target.value)} value={nameValue}></input>
			<button onClick={createUser}>Crear usuario</button>
			<button onClick={deleteUser}>Eliminar usuario</button>
			<button onClick={getTasksListFromUser}>Obtener lista</button>

			<h4>Lista de Usuarios</h4>
			{
				usersList.map((item, index)=>{
					return (
						<div key={index}>
							<label>{item.name}</label>
						</div>
					)
				})
			}

			<h4>Lista de tareas de {nameValue}</h4>
			<input onChange={(e)=> setTask(e.target.value)} value={task} onKeyDown={createNewTask}></input>
			<ul>

			{
				tasksList.map((item) =>{
					return(
						<div key={item.id}>
							<li >{item.label}</li>
							<button onClick={() => deleteTask(item.id)}>X</button>
						</div>
						
					)
				})
			}
			</ul>
		</div>
	)
}

export default Home