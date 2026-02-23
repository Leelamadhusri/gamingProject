from django.contrib import admin
from .models import AuthEvent


@admin.register(AuthEvent)
class AuthEventAdmin(admin.ModelAdmin):
	list_display = ('event', 'user', 'ip_address', 'user_agent', 'created_at')
	list_filter = ('event', 'created_at')
	search_fields = ('user__username', 'ip_address', 'user_agent')
