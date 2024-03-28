// cpf.service.ts

import { Injectable } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class ValidatorService {
  validateCPF(document: string): boolean {
   
    const cpfDigitsOnly = document.replace(/[^\d]/g, '');
    
    
    return cpf.isValid(cpfDigitsOnly);
  }

  validateCnpj(document: string): boolean {
   
    const cnpjDigitsOnly = document.replace(/[^\d]/g, '');
    
    
    return cnpj.isValid(cnpjDigitsOnly);
  }
}
