from rest_framework import exceptions, status

class DateError(Exception):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = ('End date is smaller than Start DAte')
