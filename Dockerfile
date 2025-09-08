FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências primeiro (para cache)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar o NestJS em modo desenvolvimento
CMD ["npm", "run", "start:dev"]