from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import AuthEvent

User = get_user_model()


def _get_client_ip(request):
    if not request:
        return None
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    if xff:
        return xff.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


@receiver(user_logged_in)
def log_user_logged_in(sender, request, user, **kwargs):
    AuthEvent.objects.create(
        user=user,
        event=AuthEvent.EVENT_LOGIN,
        ip_address=_get_client_ip(request),
        user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
    )


@receiver(user_logged_out)
def log_user_logged_out(sender, request, user, **kwargs):
    AuthEvent.objects.create(
        user=(user if getattr(user, 'is_authenticated', False) else None),
        event=AuthEvent.EVENT_LOGOUT,
        ip_address=_get_client_ip(request),
        user_agent=(request.META.get('HTTP_USER_AGENT', '')[:300] if request else ''),
    )


@receiver(user_login_failed)
def log_user_login_failed(sender, credentials, request, **kwargs):
    # credentials is a dict (may contain 'username')
    AuthEvent.objects.create(
        user=None,
        event=AuthEvent.EVENT_FAILED,
        ip_address=_get_client_ip(request),
        user_agent=(request.META.get('HTTP_USER_AGENT', '')[:300] if request else ''),
    )


@receiver(post_save, sender=User)
def log_user_registered(sender, instance, created, **kwargs):
    if created:
        AuthEvent.objects.create(
            user=instance,
            event=AuthEvent.EVENT_REGISTER,
            ip_address=None,
            user_agent='',
        )
