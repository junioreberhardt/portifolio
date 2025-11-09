from flask import Flask, request, render_template
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/enviar', methods=['POST'])
def enviar():
    nome = request.form.get('name')
    email_remetente = request.form.get('email')
    mensagem = request.form.get('msg')

    email_destino = "junior.eberhardt@gmail.com"
    senha_app = "iygo cjfa slrz ifxp"

    msg = MIMEMultipart()
    msg['From'] = email_remetente
    msg['To'] = email_destino
    msg['Subject'] = f"Nova mensagem do seu site de {nome}"
    corpo = f"Nome: {nome}\nEmail: {email_remetente}\nMensagem:\n{mensagem}"
    msg.attach(MIMEText(corpo, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(email_destino, senha_app)
        server.send_message(msg)
        server.quit()
        return "Mensagem enviada com sucesso!"
    except Exception as e:
        return f"Erro ao enviar: {e}"


if __name__ == '__main__':
    app.run(debug=True)
