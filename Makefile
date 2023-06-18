ANDORS_TRAIL_REPO = ${HOME}/repos/personal/andors-trail

link:
	rm public/[rxdv][arm]* || true
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/values" "public/values"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/xml" "public/xml"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/drawable" "public/drawable"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/raw" "public/raw"
