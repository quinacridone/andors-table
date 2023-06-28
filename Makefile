ANDORS_TRAIL_REPO = ./andors-trail

link:
	rm public/[rxdv][arm]* || true
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/values" "public/values"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/xml" "public/xml"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/drawable" "public/drawable"
	ln -s "${ANDORS_TRAIL_REPO}/AndorsTrail/res/raw" "public/raw"

copy:
	rm public/[rxdv][arm]* || true
	cp -r "${ANDORS_TRAIL_REPO}/AndorsTrail/res/values" "public/values"
	cp -r "${ANDORS_TRAIL_REPO}/AndorsTrail/res/xml" "public/xml"
	cp -r "${ANDORS_TRAIL_REPO}/AndorsTrail/res/drawable" "public/drawable"
	cp -r "${ANDORS_TRAIL_REPO}/AndorsTrail/res/raw" "public/raw"