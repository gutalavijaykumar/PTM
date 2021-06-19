from django.shortcuts import render

def handler404(request, *args, **argv):
    response = render(request,template_name="404.html", context={})
    response.status_code = 404
    return response


def handler500(request, *args, **argv):
    response = render(request,template_name="500.html", context={})
    response.status_code = 500
    return response

