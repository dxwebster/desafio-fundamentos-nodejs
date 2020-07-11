import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();


// Lista todas as transações
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all(); // utiliza a classe TransactionsRepository que lida com o armazenamento das informações
    const balance = transactionsRepository.getBalance();

    return response.json({ // retorna todas as transactions e o balance
      transactions,
      balance
    });
  } catch (err) { // da erro caso não encontre nada
    return response.status(400).json({ error: err.message });
  }
});


//  Cria novas transações
transactionRouter.post('/', (request, response) => {
  try {
   const { title, value, type } = request.body;

   const createTransaction = new CreateTransactionService( // utiliza do service de criação de transações 'services/CreateTransactionService.ts'
     transactionsRepository
   );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction); // retorna a nova transação criada
  } catch (err) { // da erro caso não encontre nada
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
