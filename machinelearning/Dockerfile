# Para criar a imagem (trocar nome de "my-python-app":
#$ docker build -t my-python-app .

# Para mais informações sobre opções de construção da imagem: $ docker build help

# Para executar o container (trocar nomes de "my-running-app" e "my-python-app":
#$ docker run -it --rm --name my-running-app my-python-app

# Para mais informações sobre opções de execução: $ docker run help

# Mais informações: https://docs.docker.com/samples/library/python/

# python:3 pega a versão mais recente do python3 (atualmente, 3.7.0)
# É possível mudar para uma versão específica, se quiser (e.g python:3.5.2)
FROM python:3

# Pasta onde estarão os arquivos da aplicação
WORKDIR /usr/src/app

# Instalação de requisitos
RUN sudo apt-get update 
RUN sudo apt-get install python3-tk
RUN sudo apt-get install graphviz

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copia arquivos da pasta atual (e subpastas, neste caso) para o container
COPY . .

# Sempre que tu usar o comando "docker run nome-do-container", o container executará esse comando por padrão
# Mudar, se necessário
CMD [ "python", "./src/webservice.py" ]