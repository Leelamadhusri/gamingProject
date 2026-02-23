from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    def ready(self):
        # import signals to ensure handlers are registered
        try:
            import users.signals  # noqa: F401
        except Exception:
            # avoid crashing during migrations or when signals file not available
            pass
