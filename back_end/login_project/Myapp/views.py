from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Count
from .serializers import RegisterSerializer,LoginSerializer,StudentSerializer,StaffSerializer
from django.db.models.functions import TruncMonth
from .models import student,Login,Staff
from .jwt_utils import generate_custom_access_token

@api_view(['POST'])
def register_view (requst):
    serizlizer = RegisterSerializer(data = requst.data)
    
    if serizlizer.is_valid():
        serizlizer.save() 
        return Response(
            {"message":"User register successfull"},
            status=status.HTTP_200_OK
        )
    return Response(serizlizer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data
        access_token = generate_custom_access_token(user)

        return Response({
            "message": "Login success",
            "access": access_token,
            "name": user.Name,
            "admin_name": user.Admin_name,
        }, status=200)

    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@authentication_classes([])
def change_password(request):

    Id = request.data.get("email")
    new_password = request.data.get("new_password")

    if not Id  or not new_password:
        return Response({"error": "All fields required"}, status=400)

    try:
        user = Login.objects.get(Admin_name=Id)
    except Login.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    if not user.Password :
        return Response({"error": "Old password incorrect"}, status=400)

    user.Password = new_password
    user.save()

    return Response({"message": "Password updated successfully"},status=200)

@api_view(['GET'])
@authentication_classes([])
def get_user_by_email(request):
    
    email = request.GET.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    users = Login.objects.filter(Admin_name=email)
    print("users",users)
    if not users.exists():
        return Response({"error": "User not found"}, status=404)

    serializer = LoginSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes([])
def student_list(request):
    print("User:", request.user)
    print("Auth:", request.auth)
    if request.method == "GET":
        students = student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data,status=200)
    
    if request.method == "POST":
        serializer = StudentSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"created success","data":serializer.data,},status=200)
        return Response(serializer.errors,status=400)
    
@api_view(['PUT','DELETE'])
@authentication_classes([])
def students_details(request,id):
    try:
        students = student.objects.get(id=id)
        print("students from db",students)
    except student.DoesNotExist:
        return Response({"error":"Not Found"},status=404)
    
    if request.method == 'PUT':
        serializer = StudentSerializer(students, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Updated success","data":serializer.data,},status=200)
        
    if request.method == 'DELETE':
        students.delete()
        return Response({"message":"Delete successfully"},status=200)

@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes([])
def Staff_list(request):
    if request.method == "GET":
        Staffs = Staff.objects.all()
        serializer = StaffSerializer(Staffs, many=True)
        return Response(serializer.data,status=200)
    
    if request.method == "POST":
        print("request :",request.data)
        serializers = StaffSerializer(data= request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"message":"created success","data":serializers.data},status=200)
        return Response(serializers.errors,status=400)
    
@api_view(['GET','PUT','DELETE'])
@authentication_classes([])
def Staff_details(request,id):
    try:
        staffs = Staff.objects.get(id=id)
    except student.DoesNotExist:
        return Response({"error":"Not Found"},status=404)
    
    if request.method == 'GET':
            serializer = StaffSerializer(staffs)
            return Response(serializer.data, status=200)
    
    if request.method == 'PUT':
        serializer = StaffSerializer(staffs, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Updated success","data":serializer.data},status=200)
        
    if request.method == 'DELETE':
        staffs.delete()
        return Response({"message":"Delete successfully"},status=200)

@api_view(['GET'])  
@authentication_classes([])  
def dashboard_data(request):   
    total_students = student.objects.count()
    total_staff = Staff.objects.count()
    active_staff = Staff.objects.filter(status=True).count()
    inactive_staff = Staff.objects.filter(status=False).count()
    bar_queryset = (
        Staff.objects
        .values('role')
        .annotate(staff=Count('id'))
    )

    bar_data = [
        {"name": item["role"], "staff": item["staff"]}
        for item in bar_queryset
    ]

    pie_queryset = (
        Staff.objects
        .values('status')
        .annotate(value=Count('id'))
    )

    pie_data = [
        {"name": item["status"], "value": item["value"]}
        for item in pie_queryset
    ]

    area_queryset = (
        Staff.objects
        .annotate(month=TruncMonth('join_date'))
        .values('month')
        .annotate(value=Count('id'))
        .order_by('month')
    )

    area_data = [
        {
            "month": item["month"].strftime("%b"),
            "date": item["month"].strftime("%Y-%m-%d"),
            "value": item["value"]
        }
        for item in area_queryset
    ]

    return Response({
            "cards": {
            "totalStudents": total_students,
            "totalStaff": total_staff,
            "activeStaff": active_staff,
            "inactiveStaff": inactive_staff,
        },
        "barData": bar_data,
        "pieData": pie_data,
        "areaData": area_data
    })