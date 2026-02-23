from django.db import models
from django.conf import settings


class AuthEvent(models.Model):
	EVENT_LOGIN = 'login'
	EVENT_LOGOUT = 'logout'
	EVENT_REGISTER = 'register'
	EVENT_FAILED = 'failed'

	EVENT_CHOICES = [
		(EVENT_LOGIN, 'Login'),
		(EVENT_LOGOUT, 'Logout'),
		(EVENT_REGISTER, 'Register'),
		(EVENT_FAILED, 'Failed Login'),
	]

	user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
	event = models.CharField(max_length=20, choices=EVENT_CHOICES)
	ip_address = models.GenericIPAddressField(null=True, blank=True)
	user_agent = models.CharField(max_length=300, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		uname = getattr(self.user, 'username', None)
		return f"{self.event} - {uname or 'anonymous'} @ {self.created_at:%Y-%m-%d %H:%M:%S}"
