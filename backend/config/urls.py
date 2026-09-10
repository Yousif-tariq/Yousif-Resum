"""
URL configuration for portfolio project.
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from portfolio_app.views import (
    get_portfolio_data,
    dispatch_contact_message,
    api_root_status,
    track_visit,
    get_analytics_stats
)

urlpatterns = [
    path('', api_root_status, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/portfolio-data/', get_portfolio_data, name='portfolio-data'),
    path('api/contact/', dispatch_contact_message, name='contact-dispatch'),
    path('api/track-visit/', track_visit, name='track-visit'),
    path('api/analytics-stats/', get_analytics_stats, name='analytics-stats'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
