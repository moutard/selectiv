import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: {}
      };
  }

  componentDidMount() {
    const userId = "12";

    this.getUser(userId)
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(err));

    this.getInventoryItems()
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));

    this.getTransactionsPerUserId(userId)
      .then(res => this.setState({ transactions: res }))
      .catch(err => console.log(err));
  }

  getUser = async (userId) => {
    const response = await fetch('/users/' + userId);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  getInventoryItems = async () => {
    const response = await fetch('/items');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  getTransactionsPerUserId = async (userId) => {
    const response = await fetch('/user/' + userId + '/transactions');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome {this.state.user.name}</h1>
        </header>
        <body>
          <PacksList items={this.state.items} />
          <Report transactions={this.state.transactions}/>
        </body>
      </div>
    );
  }
}

function PacksList(props) {
  const inventoryItems = props.items;

  // make sure both are loaded.
  if (inventoryItems && inventoryItems.length > 0) {
    const listItems = inventoryItems.map(function(item) {
      return (
          <InventoryItem name={item.name} price={item.current_price} currency={item.currency} />
      )
    }

    );
    return (
      <div id="Packs">
        <h1> Packs </h1>
        <div class="InventoryListItems">{listItems}</div>
        <button id="autre">Autre</button>
      </div>
    );
  } else {
    return <div>nothing</div>
  }

}

class InventoryItem extends Component {

  render () {
    const { itemId } = this.props;

    return (
      <button class="InventoryItem" onClick={this.handleSubmit} id={itemId}>
        {this.props.name} - {this.props.price}{this.props.currency}
      </button>
    );
  }
}

function Report(props) {
  const transactions = props.transactions;

  // make sure both are loaded.
  if (transactions && transactions.length > 0) {
    const transactionsList = transactions.map(function(item) {
      return (
          <Transaction name={item.label} price={item.priceSold} currency={item.currency} />
      )
    }

    );
    return (
      <div id="Transactions">
        <h1> Transactions </h1>
        <div class="transactions">{transactionsList}</div>
      </div>
    );
  } else {
    return <div>no transactions</div>
  }

}

function Transaction(props) {
  return (
    <div class="Transaction">
        <span>{props.name}</span>
        <span>{props.price}{props.currency}</span>
    </div>
  )
}

export default App;
