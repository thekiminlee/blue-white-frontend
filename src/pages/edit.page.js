import React, { Component } from 'react';
import { getUserDetail, updateUserDetail } from '../repositories/api.repo';
import { useNavigate  } from 'react-router-dom';

export default class Edit extends Component {
    
    constructor(props) {
        super(props);
        const _id = sessionStorage.getItem('uid');
        this.state = {
            id: JSON.parse(_id),
            userDetail: {}
        }
    }

    async componentDidMount() {
        const _userDetail = await getUserDetail(this.state.id);

        this.setState({
            userDetail: _userDetail.user
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const payload = JSON.stringify(this.state.userDetail);
        const value = await updateUserDetail(this.state.userDetail._id, payload);
        if (value.updated) {
            alert('Information Updated');
            window.location.href = '/';
        } else {
            alert('Failed to update')
        }
        
    }

    handleOnChange = (e) => {
        const name = e.target.name;
        if (['first', 'last'].includes(name)) {
            this.state.userDetail.name[name] = e.target.value;
        } else {
            this.state.userDetail[name] = e.target.value;
        }
        
        this.setState({
            userDetail: this.state.userDetail
        });
    }

    renderDetail() {
        const style = {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }
        return (
            <div className='container'>
                <form className='form-container' style={{width: '50%'}} onSubmit={this.handleSubmit}>
                    <section style={style}>
                        <label>First Name</label>
                        <input required name='first' type='text' value={this.state.userDetail?.name?.first} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>Last Name</label>
                        <input required name='last' type='text' value={this.state.userDetail?.name?.last} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>Age</label>
                        <input name='age' type='number' value={this.state.userDetail?.age} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>Eye Color</label>
                        <input name='eyeColor' type='text' value={this.state.userDetail?.eyeColor} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>Company</label>
                        <input name='company' type='text' value={this.state.userDetail?.company} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>Phone</label>
                        <input name='phone' type='tel' value={this.state.userDetail?.phone} onChange={this.handleOnChange}/>
                    </section>
                    <section style={style}>
                        <label>address</label>
                        <textarea name='address' value={this.state.userDetail?.address} onChange={this.handleOnChange}/>
                    </section>
                    <br/>
                    <button className='btn' type='submit'>Update</button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <a href='/' style={{margin: '10px 0 0 10px'}} className='btn'>Dashboard</a>
                {this.renderDetail()}
            </div>
        )
    }
}