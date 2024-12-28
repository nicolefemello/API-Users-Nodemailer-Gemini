class passwordMiddleware {
  static validatePassword(password) {
    const requirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    /*Verifica se a senha contém pelo menos uma letra minúscula, maiúscula, um número e um caractere especial, com no mínimo
     8 caracteres e no máximo 20. Permite apenas letras, números e os caracteres especiais definidos*/

    return requirements.test(password);
  }
}

export default passwordMiddleware;
