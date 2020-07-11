import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

// Cria a regra de negócio da criação de Services
// Não permite criar uma transação com tipo inválido
// Verifica se tem saldo para fazer um outcome
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

     // verfifica se o que foi passado é um tipo válido
    if(!["income", "outcome"].includes(type)) {
      throw new Error("Transaction type invalid")
    }

    // verifica se  o tipo for igual a outcome, e for menor que o value da erro porque não tem saldo
    const { total } = this. transactionsRepository.getBalance();
    if ( type === "outcome" && total < value){
      throw new Error('You do not have enough balance');
    }

     // cria o novo serviço de transação
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
     return transaction;
  }
}

export default CreateTransactionService;
