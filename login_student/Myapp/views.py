from django.shortcuts import render,redirect,get_object_or_404
from .models import student
from django.contrib.auth import authenticate
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

def home (request):
    if request.method == 'POST':
        userName = request.POST.get('username')
        passWord = request.POST.get('password')
        user = authenticate(request, username=userName, password=passWord)        
        if user is not None:
            refernce = RefreshToken.for_user(user)
            access_token = str(refernce.access_token)
            
            responce = redirect('dashboard')
            responce.set_cookie('access_token',access_token)
            return responce
        else:
            return HttpResponse("Invalid credentials")
    return render(request, '../templates/index.html')

def dashboard(request):
    token = request.COOKIES.get('access_token')
    if not token:
        return redirect('home')
    try:
        jwt_token = JWTAuthentication()
        validation= jwt_token.get_validated_token(token)
        user = jwt_token.get_user(validation) 
        print("user",user)
    except Exception as e:
        print("ERROR:", e)
        return redirect('home')
        
    students = student.objects.all()
    return render(request,'../templates/dashboard.html',{'students': students})

def add_student(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        age = request.POST.get('age')
        study = request.POST.get('study')
        
        student.objects.create(            
            name=name,
            age=age,
            study=study
        )
        return redirect('dashboard')
    return render(request,'../templates/add_student.html')

def edit_student(request, id):
    students = get_object_or_404(student, id=id)

    if request.method == "POST":
        students.name = request.POST.get('name')
        students.age = request.POST.get('age')
        students.study = request.POST.get('study')
        students.save()
        return redirect('dashboard')

    return render(request, 'edit_student.html', {'student': students})


def delete_student(request, id):
    students = get_object_or_404(student, id=id)
    students.delete()
    return redirect('dashboard')


