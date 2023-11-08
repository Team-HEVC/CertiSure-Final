from flask import Flask, render_template, request, send_file, redirect, session, flash,jsonify,abort
from werkzeug.security import generate_password_hash, check_password_hash
import io
import uuid
import qrcode
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
import urllib.request
import pandas as pd
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
from dotenv import load_dotenv
import os
from flask_pymongo import PyMongo
import json
from flask_cors import CORS, cross_origin
from PIL import Image, ImageDraw, ImageFont
import base64
import requests
import imgbbpy
from flask_mail import Mail, Message 
import zlib

from datetime import timedelta

load_dotenv()


############### APP CONFIG #############
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
url = "http://127.0.0.1:5000/verify/"
font_bold = ImageFont.truetype("CrimsonText-Bold.ttf", 200)
font_regular = ImageFont.truetype("CrimsonText-Regular.ttf", 48)

############# DB CONFIG ###################

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
groups = mongo.db.groups
certificates = mongo.db.certificates
users = mongo.db.users


# configuration of mail 
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['MAIL_SERVER'] = "smtp.googlemail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 



################# helper functions ###################


# generate cert func
def generate_certificate_image(certificate_uuid):
    data=certificates.find_one({"_id":certificate_uuid})
    group_detials= groups.find_one({"_id":data['group_id']})
    # f"{group_detials['group_id']}.png"
    # urllib.request.urlretrieve(group_detials['imagelink'], f"abc.jpg")
    # img = Image.open(f"./abc.jpg")
    # draw = ImageDraw.Draw(img)
    response = urllib.request.urlopen(group_detials['imagelink'])
    img_data = response.read()
    img = Image.open(io.BytesIO(img_data))
    draw = ImageDraw.Draw(img)

    draw.text(
        xy=(int(group_detials["name_x"]), int(group_detials["name_y"])), 
        text=data["username"], fill=(0, 0, 0), 
        font=font_bold, 
        anchor="ms",
        )
    draw.text(
            xy=(int(group_detials["link_x"]), int(group_detials["link_y"])),
            text="certisure.com/credentials/" + certificate_uuid,
            fill=(0, 0, 0),
            font=font_regular,
            anchor="ms",
        )
    qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=6,
            border=2,
        )
    qr.add_data("https://certisure.vercel.app/credential/"+certificate_uuid)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    img.paste(qr_img, (int(group_detials["qr_x"]), int(group_detials["qr_y"])))

    # img.show()
    # img.show()
    img = img.convert('RGB')
    img_byte_array = io.BytesIO()
    img.save(img_byte_array, format="JPEG")
    img_byte_array.seek(0)
    return img_byte_array


# Add sending mail
def send_mail(name,email,certificate_uuid):
    try:
        msg = Message(
            subject='Certificate of Completion',
            sender='tapp78726@gmail.com',  
            recipients=[email]  
        )
        msg.html=render_template("mail.html",name=name,certificate_uuid=certificate_uuid)
        # Add more context to the message
        mail.send(msg)
        print("Email message sent")
    except Exception as e:
        print(f'Error: {str(e)}')


def generate_temp(username,link,  startname, finalname,startlink, finallink, startqr, finalqr):
    certificate_uuid=uuid.uuid4()
    startname=[int(c) for c in startname.split(",")]
    finalname=[int(c) for c in finalname.split(",")]
    startlink=[int(c) for c in startlink.split(",")]
    finallink=[int(c) for c in finallink.split(",")]
    startqr=[int(c) for c in startqr.split(",")]
    finalqr=[int(c) for c in finalqr.split(",")]
    urllib.request.urlretrieve(link, f"xyz.jpg")
    img = Image.open(f"./xyz.jpg")
    draw = ImageDraw.Draw(img)
    name_x,name_y=(startname[0]+finalname[0])/2,((startname[1]+finalname[1])/2)+100
    link_x,link_y=(startlink[0]+finallink[0])/2,((startlink[1]+finallink[1])/2)
    qr_x,qr_y=startqr[0],startqr[1]
    draw.text(
        xy=(int(name_x), int(name_y)), 
        text=username, fill=(0, 0, 0), 
        font=font_bold, 
        anchor="ms",
        )
    draw.text(
            xy=(int(link_x), int(link_y)),
            text="certisure.com/credentials/" + certificate_uuid,
            fill=(0, 0, 0),
            font=font_regular,
            anchor="ms",
        )
    qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=6,
            border=2,
        )
    qr.add_data("http://localhost:5173/credential/"+certificate_uuid)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    img.paste(qr_img, (int(qr_x), int(qr_y)))

    img.show()
    img = img.convert('RGB')
    img_byte_array = io.BytesIO()
    img.save(img_byte_array, format="JPEG")
    img_byte_array.seek(0)
    return img_byte_array


def certificate_group_create(organizationid, issuer,\
    groupname, type, imagelink, fontname, startname, finalname,\
    startlink, finallink, startqr, finalqr, startrank=None, finalrank=None,email=None):
    startname=[int(c) for c in startname.split(",")]
    finalname=[int(c) for c in finalname.split(",")]
    startlink=[int(c) for c in startlink.split(",")]
    finallink=[int(c) for c in finallink.split(",")]
    startqr=[int(c) for c in startqr.split(",")]
    finalqr=[int(c) for c in finalqr.split(",")]
    if startrank and finalrank:
        startrank=[int(c) for c in startrank.split(",")]
        finalrank=[int(c) for c in finalrank.split(",")]
    name_x,name_y=(startname[0]+finalname[0])/2,((startname[1]+finalname[1])/2)+(200*0.5)
    link_x,link_y=(startlink[0]+finallink[0])/2,((startlink[1]+finallink[1])/2)
    qr_x,qr_y=startqr[0],startqr[1]
    id = str(uuid.uuid4())
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    payload={
        "_id":id,
        "date":current_date,
        "group_name":groupname,
        "type":type,
        "imagelink":imagelink,
        "issuer":issuer,
        "group_id":organizationid,
        "fontname":fontname,
        "name_x":name_x,
        "name_y":name_y,
        "link_x":link_x,
        "link_y":link_y,
        "qr_x":qr_x,
        "qr_y":qr_y,
        "email":email
    }
    groups.insert_one(payload)
    return "group created for new event"

def upload_image(i=None):
    api_key = os.getenv("IMG_API")  # Replace with your actual API key
    client = imgbbpy.SyncClient(api_key)
    fl="./certificate.jpg"
    if i:
        fl=i
    image = client.upload(file=fl)
    return image.url



def verify_certificate_uuid(certificate_uuid):
    data = certificates.find_one({"_id": certificate_uuid})
    if data:
        img_byte_arr = generate_certificate_image(data["username"], certificate_uuid)
        img = Image.open(img_byte_arr)
        pdf_buffer = io.BytesIO()
        img.save(pdf_buffer, "PDF", resolution=100.0, save_all=True, append_images=[])
        pdf_buffer.seek(0)
        return send_file(pdf_buffer, mimetype="application/pdf")
    else:
        return "cerificate not found"

def generate_new_certificate(groupid,username,email):
    data=groups.find_one({"_id":groupid})
    id=str(uuid.uuid4())
    # cert= generate_certificate_image()
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    payload={
        "_id":id,
        "group_id":groupid,
        "group_name":data["group_name"],
        "email":email,
        "username":username,
        "data":current_date
    }
    certificates.insert_one(payload)
    data=certificates.find_one({"_id":id})
    send_mail(name=username,email=email,certificate_uuid=id)
    if data:
        return id
    else :
        return None


############# ROUTING ###############

@app.route("/img",methods=["post"])
def upload_img():
    img=upload_image()
    return jsonify(img)


# test
@app.route("/", methods=["GET"])
def root():
    return jsonify({"msg": "works"})


# get groups test
@app.route("/groups", methods=["GET"])
def group():
    data = groups.find()
    data_list = [i for i in data]
    data_list_reversed = data_list[::-1]
    return jsonify(data_list_reversed)


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    usr = users.find_one({"email": email})
    if usr and check_password_hash(usr["password"], password):
        token = create_access_token(identity=email)
        return jsonify({"msg": "true", "token": token}), 200
    else:
        return jsonify({"msg": "wrong credentials"}), 401


@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    username = data.get("username", None)
    phno = data.get("phno", None)
    pass_hash = generate_password_hash(password)
    payload = {
        "_id": str(uuid.uuid4()),
        "email": email,
        "password": pass_hash,
        "phone": phno,
        "username": username,
    }
    users.insert_one(payload)
    if users.find_one({"email": email}):
        return jsonify({"msg": "inserted with sucess", "payload": payload}), 201

@app.route("/create_group", methods=["POST"])
def create_group():
    data = request.json
    organizationid = data.get("organizationid")
    issuer = data.get("issuer")
    groupname = data.get("groupname")
    type = data.get("type")
    imagelink = data.get("imagelink")
    fontname = data.get("fontname")
    startname = data.get("startname")
    finalname = data.get("finalname")
    startlink = data.get("startlink")
    finallink = data.get("finallink")
    startqr = data.get("startqr")
    finalqr = data.get("finalqr")
    startrank = data.get("startrank",None)
    finalrank = data.get("finalrank",None)
    email=data.get("email",None)
    print(finalname)
    res= certificate_group_create(organizationid, issuer,\
    groupname, type, imagelink, fontname, startname, finalname,\
    startlink, finallink, startqr, finalqr, startrank, finalrank,email)
    data = groups.find_one({"group_name":groupname})
    if data:
        return jsonify(msg=res)
    else:
        return jsonify(msg="error occured")
    

@app.route("/get_user_groups/<email>",methods=["GET"])
def get_group(email):
    payload =groups.find({"email":email})
    payload =[ i for i in payload]
    return jsonify(payload)

# to generate a certificate
@app.route("/certificate", methods=["POST"])
def generate_certificate():
    data = request.json
    username = data.get("username", None)
    email = data.get("email", None)
    g_id = data.get("_id", None)
    certificate_uuid = generate_new_certificate(g_id,username,email)
    if certificates.find_one({"_id": certificate_uuid}):
        img_byte_arr = generate_certificate_image(certificate_uuid)
        img = Image.open(img_byte_arr)
        # img.show()
        pdf_buffer = io.BytesIO()
        img.save(pdf_buffer, "PDF", resolution=100.0, save_all=True, append_images=[])
        pdf_buffer.seek(0)
        return send_file(pdf_buffer, mimetype="application/pdf")


@app.route("/verify/<certificate_uuid>", methods=["GET"])
def verify_certificate(certificate_uuid):
    data = certificates.find_one({"_id": certificate_uuid})
    group1=groups.find_one({"_id": data["group_id"]})["group_name"]
    group2=groups.find_one({"_id": data["group_id"]})["group_id"]

    if data:
        # img_byte_arr = generate_certificate_image(certificate_uuid)
        # img = Image.open(img_byte_arr)
        # pdf_buffer = io.BytesIO()
        # img.save(pdf_buffer, "PDF", resolution=100.0, save_all=True, append_images=[])
        # pdf_buffer.seek(0)
        payload = {
            "_id": data["_id"],
            "email": data["email"],
            "username": data["username"],
            "groupname": group1,
            "group_id":group2
        }
        # pdf_base64 = base64.b64encode(pdf_buffer.read()).decode("utf-8")
        return jsonify({"payload": payload})
    else: return jsonify(msg="error")

@app.route("/verify_image/<certificate_uuid>", methods=['GET'])
def verify_certificate_url(certificate_uuid):
    return verify_certificate_by_uuid(certificate_uuid)

#Function to verify a certificate by UUID
def verify_certificate_by_uuid(certificate_uuid):
    data = certificates.find_one({"_id": certificate_uuid})
    if data:
        img_byte_arr = generate_certificate_image(certificate_uuid)
        img = Image.open(img_byte_arr)
        pdf_buffer = io.BytesIO()
        img.save(pdf_buffer, "PDF", resolution=100.0, save_all=True, append_images=[])
        pdf_buffer.seek(0)
    if data:
        return send_file(generate_certificate_image(certificate_uuid), mimetype='image/jpeg')
    else:
        return "Certificate not found."

@app.route("/preview",methods=["POST"])
def preview_certificate():
    data = request.json
    link = data.get("imagelink")
    startname = data.get("startname")
    finalname = data.get("finalname")
    startlink = data.get("startlink")
    finallink = data.get("finallink")
    startqr = data.get("startqr")
    finalqr = data.get("finalqr")
    certi = generate_temp(username="jhon doe",link=link,startlink=startlink,startname=startname,finalname=finalname,finallink=finallink,startqr=startqr,finalqr=finalqr)
    img = Image.open(certi)
    pdf_buffer = io.BytesIO()
    pdf_buffer.seek(0)
    img.save(pdf_buffer, "PDF", resolution=100.0, save_all=True, append_images=[])
    pdf_base64 = base64.b64encode(pdf_buffer.read()).decode("utf-8")
    return jsonify(pdf=pdf_base64)

@app.route("/delete_group/<group_id>",methods=["DELETE"])
def delete_group(group_id):
    # in frontend just send a string 'true' if u want to delete certi or 'false' if u donnt want
    
    data = request.json
    flag=data.get("flag","false")
    if flag=="flase":
        groups.delete_one({"_id":group_id})
        return jsonify(msg="deletetd group")
    else:
        certificates.delete_many({"group_id":group_id})
        groups.delete_one({"_id":group_id})
        return jsonify(msg="deleted groups with certificates")


@app.route("/delete_cert/<cert_id>",methods=["DELETE"])
def delete_cert(cert_id):
    certificates.delete_one({"_id":cert_id})
    return jsonify(msg="deletetd certificate")

@app.route("/get_certificate_by_email/<group_id>", methods=["GET"])
def get_certificate_by_email(group_id):
    data = certificates.find({"group_id": group_id})
    
    certificate_list = list(data)
    certificate_list.reverse()
    return jsonify(certificate_list)
    # if certificate_list:
    #     return jsonify(certificate_list)
    # else:
    #     abort(404, description="No certificates found for this group_id")
    

@app.route('/upload/<group_id>', methods=['POST'])
def upload_file(group_id):
    file = request.files['file']

    if file:
        try:
            data = pd.read_csv(file)

            for index, row in data.iterrows():
                username = row['Name']
                email = row['Email']
                group_id = group_id  
                generate_new_certificate(groupid=group_id,email=email,username=username)
            return jsonify({'message': 'Certificates generated successfully'})

        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': 'No file provided'})

@app.route("/get_all_certificates",methods=["GET"])
def get_all():
    data= [i for i in certificates.find()]
    return jsonify(data)

@app.route("/certificates_email", methods=["GET", "POST"])
def certificates_by_email():
    if request.method == "POST":
        data = request.json
        email = data.get("email", None)
        certs = certificates.find({"email": email})
        # for c in certs:
        #     cert_date_data=c["date"]
        #     cert_date=datetime.strptime(cert_date_data,"%Y-%m-%d %H:%M:%S")
        #     cert
        print(str(certs))
        return jsonify([i for i in certs])


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


############## START SERVER ###############
if __name__ == "__main__":
    app.run(port=8080, debug=True)