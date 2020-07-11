import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[]; // variável que armazena na memória da aplicação

  constructor() {
    this.transactions = [];
  }


 // cria uma função para listar todas as transações
  public all(): Transaction[] {
    return this.transactions;
  }


   // cria uma função que gera o balanço de transações
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction:Transaction) => {
        switch(transaction.type){
          case "income":
            accumulator.income += transaction.value;
            break;
          case "outcome":
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }


   // cria uma nova transação
  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction =  new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;


  }
}

export default TransactionsRepository;
