import urllib.request,json,sys, base64

url="http://met.gov.om/dms/download?DATATYPES=MetarData&FORMAT=JSON&MAXPARAMVALUE=TIME&CCCC=OOMA"
jsonurl=urllib.request.urlopen(url)
text=json.loads(jsonurl.read())

def lambda_handler(event, context):
	if text["cavok"]=="false" :
		cavok=str(text["cloudlevel"])
	else :
		cavok="CAVOK "
	integ=int(text["windSpeed"])
	if integ<0:
		speed="000"
	elif integ<10:
		speed="0"+str(integ)
	else:
		speed=str(integ)
	dinteg=int(text["windDirection"])
	if dinteg<1:
		direction="VRB"
	elif dinteg<100:
		direction="0"+str(dinteg)
	else:
		direction=str(dinteg)
	tinteg=int(text["temperature"])
	if tinteg<10:
		temp="0"+str(tinteg)
	else:
		temp=str(tinteg)
	metar=str("METAR " + str(text["cccc"])+" "+str(text["issueDate"][6:8])  +str(text["issueDate"][0:2])+str(text["issueDate"][3:5])+ "Z "+direction+speed +"KT " + str(text["weather"])+"" +cavok+temp+"/XX Q"+str(int(text["pressure"])))
	final={"result":metar}
	return {
		'output':metar
	}
