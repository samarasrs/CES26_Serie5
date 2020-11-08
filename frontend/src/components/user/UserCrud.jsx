import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'



const baseUrl = 'http://localhost:3001/posts'
const initialState = {
    show: '',
    user: { name: '', idade: '' },
    list: []
}



export default class UserCrud extends Component {
    
    state = { ...initialState }
    
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    

    save() {
        const user = this.state.user
        const method = 'post'
        const url = baseUrl
        if(user.idade>=18 && user.name!=''){
            axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ show: this.state.show, user: initialState.user, list })
            })
        }
        else if(user.idade<18)
            alert("Idade Inválida! Insira um número maior igual a 18!")
        else if(user.name=='')
            alert("Por favpr, insira seu nome!")
        
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleClick(event){
        if(this.state.show === event.target.value)
            this.setState({show: initialState.show, user: initialState.user, list: this.state.list})
        
        else{
            this.setState({show: event.target.value, user: initialState.user, list: this.state.list})
        }
        console.log(this.state.show)
    }
    
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.idade}</td>
                    
                </tr>
            )
        })
    }

    renderForm() {
        return (
            
            
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." 
                                required="required"/>
                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Idade</label>
                            <input type="number" className="form-control"
                                name="idade"
                                min="18"
                                value={this.state.user.idade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a idade..." 
                                required="required" />
                            <div class="invalid-feedback">
                                Idade Inválida! Favor inserir um número maior que 18!
                            </div>
                                
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary bg-sucess"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
                
                
                <center>
                <button value="1" className="btn btn-primary"
                    onClick={e =>this.handleClick(e)}
                                >
                    Mostar Dados
                </button>
            </center>
            </div>

            
        )
    }


    
    
    
    render() {
        return (
            <Main>
                {this.renderForm()}
                {this.state.show ==='1' && this.renderTable()}
                
            </Main>
        )
    }
}
