from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import requests

API_KEY = 'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx'


@api_view(["GET"])
def yelp(request):
    location = request.GET.get('location')

    headers = {'Authorization': 'Bearer %s' % API_KEY}
    url = 'https://api.yelp.com/v3/businesses/search'
    params = {'term': 'parking lot', 'location': location,
              'sort_by': 'rating'}
    resp = requests.get(url, params=params, headers=headers)
    businesses = resp.json().get('businesses')

    return Response(status=status.HTTP_200_OK, data={"businesses": businesses})


@api_view(["GET"])
def yelpdeep(request):
    location = request.GET.get('location')
    offset = 0
    limit = 50

    headers = {'Authorization': 'Bearer %s' % API_KEY}
    url = 'https://api.yelp.com/v3/businesses/search'
    params = {'term': 'parking lot', 'location': location,
              'limit': limit, 'offset': offset}
    resp = requests.get(url, params=params, headers=headers)
    businesses = resp.json()
    result_size = len(businesses.get('businesses'))
    new_businesses = businesses.get('businesses')

    while result_size == limit:
        offset += limit
        params = {'term': 'parking lot', 'location': location,
                  'limit': limit, 'offset': offset}
        resp = requests.get(url, params=params, headers=headers)
        businesses = resp.json()
        result_size = len(businesses.get('businesses'))
        new_businesses.extend(businesses.get('businesses'))

    return Response(status=status.HTTP_200_OK, data={"businesses": new_businesses})