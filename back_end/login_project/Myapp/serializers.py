from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Login,student,Staff,Role
class RegisterSerializer(serializers.ModelSerializer):
    
    def createadmin(self,validation_data):
        user = User.objects.create_user(
            username= validation_data['username'],
            email= validation_data['email'],
            password= validation_data['username']
        )
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ['Admin_name','Password']
        # username = serializers.CharField()
        # password = serializers.CharField()
    
    def validate(self,data):
        try:
            user = Login.objects.get(Admin_name = data['Admin_name'])
        except Login.DoesNotExist:
            raise serializers.ValidationError("user not found")
        if user.Password != data['Password'] :
            raise serializers.ValidationError("Invalid Credential")
        print("user",user)
        return user
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = "__all__"
        
    def validate_full_name(self, value):
        return value.title() if value else value
        
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"
        
    def validate_role(self, value):
        if value:
            return value.title()
        return value

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"
        
    def validate_full_name(self, value):
        if value:
            return value.title()
        return value
    
    def validate_role(self, value):
        if value:
            return value.title()
        return value
