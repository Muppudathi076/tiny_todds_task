from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta

def generate_custom_access_token(user):

    token = AccessToken()

    token['user_id'] = user.id
    token['admin_name'] = user.Admin_name
    token['password'] = user.Password

    token.set_exp(lifetime=timedelta(minutes=30))
    return str(token)

def decode_token(raw_token):
    print("entery okken")
    try:
        token = AccessToken(raw_token)
        return token.payload
    except Exception as e:
        return {"error": str(e)}