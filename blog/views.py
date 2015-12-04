from django.views import generic
from django.shortcuts import get_object_or_404
from . import models
from django.views.generic.base import ContextMixin
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.mail import send_mail,EmailMessage

class BlogIndex(generic.ListView,ContextMixin):
    queryset = models.Entry.objects.published()
    template_name = "home.html"
    paginate_by = 5

    def get_context_data(self,**kwargs):
    	context = super(BlogIndex,self).get_context_data(**kwargs)
    	context['tags'] = models.Tag.objects.all()
    	return context

class BlogDetail(generic.DetailView):
    model = models.Entry
    template_name = "post.html"

    def get_context_data(self, **kwargs):
    	context = super(BlogDetail,self).get_context_data(**kwargs)
    	context['tags'] = models.Tag.objects.all()
    	return context

class TagIndex(generic.ListView):
	template_name = "tags.html"

	def get_queryset(self):
		print(self.kwargs['slug'])
		self.tag = get_object_or_404(models.Tag,slug=self.kwargs['slug'])
		return self.tag.entry_set.all()
		
	def get_context_data(self,**kwargs):
		context = super(TagIndex,self).get_context_data(**kwargs)
		context['tags'] = models.Tag.objects.all()
		context['tag'] = self.tag
		return context

@api_view(['POST'])
def contactView(request):
	name = request.data.get("name",False)
	email = request.data.get("email",False)
	message = request.data.get("message",False)
	recipient = "sharaddargan@gmail.com"
	subject = "Contact Notification from "+name
	body = "name: "+name+"\nemail: "+email+"\nmessage: "+message
	email= EmailMessage(subject , body , to=[recipient])
	res = email.send()
	return HttpResponse("Success")