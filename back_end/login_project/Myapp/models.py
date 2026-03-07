from django.db import models

# class Login(models.Model):
#     Admin_name = models.CharField(max_length=100)
#     Password = models.CharField(max_length=100)

class Login(models.Model):
    Name = models.CharField(max_length=100, null=True, blank=True)
    Admin_name = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

class student(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    age = models.IntegerField()
    study = models.CharField(max_length=100, null=True, blank=True)
    Father_Name = models.CharField(max_length=100, null=True, blank=True)
    Mother_Name = models.CharField(max_length=100, null=True, blank=True)
    Phone_No = models.IntegerField()
    Address = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=100, null=True, blank=True)
    
class Staff(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=15)
    qualification = models.CharField(max_length=100, null=True, blank=True)
    join_date = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=True)  
    create_option = models.BooleanField(default=True)  
    view_option = models.BooleanField(default=True)  
    edit_option = models.BooleanField(default=False)  
    delete_option  = models.BooleanField(default=False)  
    role = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    experience = models.IntegerField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.full_name

class Role(models.Model):
    role = models.CharField(max_length=100,null=True,blank=True)
    status = models.BooleanField(default=True)  