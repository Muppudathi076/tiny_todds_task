from django.urls import path 
from .import views

urlpatterns = [
    path('register/',views.register_view),
    path('login/',views.login_view),
    path('students/',views.student_list),
    path('students/<int:id>',views.students_details),
    path('staffs/',views.Staff_list),
    path('staffs/<int:id>',views.Staff_details),
    path('change/password/', views.change_password),
    path('user/details/', views.get_user_by_email),
    path('user/dashboard/', views.dashboard_data),
]