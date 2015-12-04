from django.conf.urls import patterns, url
from . import views, feed

urlpatterns = patterns(
    '',
    url(r'^feed/$', feed.LatestPosts(), name="feed"),
    url(r'^$', views.BlogIndex.as_view(), name="index"),
    url(r'^tag/(?P<slug>\S+)$', views.TagIndex.as_view(), name="tag"),
    url(r'^entry/(?P<slug>\S+)$', views.BlogDetail.as_view(), name="entry_detail"),
    url(r'^contact/$', views.contactView, name="contactView"),
)
