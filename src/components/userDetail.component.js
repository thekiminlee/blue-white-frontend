import React from "react";
import { getUserDetail } from "../repositories/api.repo";
import Avatar from 'react-avatar';
import { json, Link } from "react-router-dom";

export default class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        const _id = sessionStorage.getItem('uid');
        this.state = {
            id: JSON.parse(_id),
            userDetail: {},
            showBalance: false
        }
    }

    async componentDidMount() {
        const _userDetail = await getUserDetail(this.state.id);

        this.setState({
            userDetail: _userDetail.user
        });
    }

    renderDetail() {
        const attributeList = ['age', 'eyeColor', 'company', 'email', 'phone', 'address']
        const details = [];
        attributeList.forEach(attr => {
            const item = this.state.userDetail[attr];
            details.push(
                <div className="detail-container" key={attr}>
                    <label className="attribute">{attr}</label>
                    <label className="valueText">{item}</label>
                </div>
            )
        });
        return <div>{details}</div>;
    }

    renderName() {
        return (
            <div className="user-name">
                <text>{this.state.userDetail?.name?.first} {this.state.userDetail?.name?.last}</text>
            </div>
        )
    }

    renderAvatar() {
        return <Avatar src={this.state.userDetail?.picture}/>
    }

    _editButton() {
        return (
            <Link to='/edit' className="btn">Edit</Link>
        );
    }

    _balanceButton() {
        const handleOnClick = () => {
            this.setState({
                showBalance: !this.state.showBalance
            });
        }

        return (
            <button className="btn" onClick={handleOnClick}>Balance</button>
        )
    }

    renderUserOptions() {
        const displayBalance = () => {
            const uidString = sessionStorage.getItem('uid');
            const uid = JSON.parse(uidString);
            
            const showBalance = this.state.showBalance && uid == this.state.userDetail._id;
            return (
                <div style={{color: showBalance ? null : 'transparent'}}>
                    Current Balance: {this.state.userDetail.balance}
                </div>
            )
        }

        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                { displayBalance() }
                <br/>
                <div className="detail-container" style={{width: '60%', padding: '10px'}}>
                    {this._balanceButton()}
                    {this._editButton()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                {this.renderAvatar()}
                {this.renderName()}
                {this.renderUserOptions()}
                {this.renderDetail()}
            </div>
        )
    }
}