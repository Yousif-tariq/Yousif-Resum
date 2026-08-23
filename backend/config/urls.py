"""
URL configuration for portfolio project.
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from portfolio_app.views import get_portfolio_data, dispatch_contact_message

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/portfolio-data/', get_portfolio_data, name='portfolio-data'),
    path('api/contact/', dispatch_contact_message, name='contact-dispatch'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
