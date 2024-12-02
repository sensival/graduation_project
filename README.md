# ✏️ Kardex Gallery 


**`Sole contributer`**

<br>

![image](https://github.com/user-attachments/assets/a2d3f775-be55-44a4-a2ca-9fd354162ec6)

### 주요 페이지 화면

![image](https://github.com/user-attachments/assets/dd7955ae-129e-47ff-a7e7-c72cd9cb84f8)

## ⚒️ Development Tools

![image](https://github.com/user-attachments/assets/508ea1ff-62ec-4155-b64b-805a9a416bfe)

## 📝 Demo URL
https://graduation-project-nu-ashy.vercel.app/


## 💌 Code

### API view code

```python
# 특정 환자의 사진 목록 API
class PatientPhotosAPI(generics.ListCreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny] 
    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        # Patient가 존재하는지 확인
        try:
            queryset = Photo.objects.filter(patient_id=patient_id)
            print(f"Retrieved QuerySet: {queryset}")  # 디버깅 로그
            return queryset
        except Exception as e:
            print(f"Error in get_queryset: {e}")
            return Photo.objects.none()  # 빈 QuerySet 반환
    
    def list(self, request, *args, **kwargs):
        patient_id = self.kwargs['patient_id']
        queryset = self.get_queryset()
        print(f"Queryset: {queryset}")  # Debugging 용 로그
        if not queryset.exists():
            print(f"No photos found for patient {patient_id}")
            return Response([], status=status.HTTP_200_OK)  # 빈 배열 반환
        return super().list(request, *args, **kwargs)

# 사진 업로드 API
class PhotoCreateAPI(generics.CreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        patient_id = self.kwargs['patient_id']
        username = self.request.data.get('uploaded_by')  # 요청에서 username 가져오기
        serializer.save(
            uploaded_by=username,  # username 저장
            patient_id=patient_id  # patient_id 저장
        )

# 개별 사진에 대해 조회(Retrieve), 수정(Update), 삭제(Delete) 기능 제공.
class PhotoDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer 
    def put(self, request, *args, **kwargs):
        # 사진을 전체적으로 수정하는 기능
        return super().put(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        # 사진의 일부 필드만 수정하는 기능 (partial update)
        return super().patch(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        # 사진을 삭제하는 기능
        return super().delete(request, *args, **kwargs

```


### Component Code
```javascript
// TimeLine.js
const TimeLine = ({ patientId }) => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);  // 에러 상태 추가
    const navigate = useNavigate();
    const { wardId } = useParams();
    useEffect(() => {
        if (!patientId) return;  // patientId가 없으면 데이터 요청을 하지않음        
            const fetchPhotos = async () => {
            try {const response = await axios.get
                (`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos`,
 	            {headers: {'Content-Type': 'application/json',},credentials: 'include',});                
                if (response.data.length === 0) {
                    setError('사진이 없습니다.');  // 사진이 없을 때 에러 메시지 표시
                    setPhotos([]);  // 빈 배열로 초기화
                } else {
                    const sortedPhotos = response.data.sort((a, b) => new Date(b.upload_time) - new Date(a.upload_time));
                    setPhotos(sortedPhotos);
                    setError(null);  // 에러 메시지 초기화
                }
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
        fetchPhotos();
    }, [patientId]);  // patientId가 변경될 때마다 새로 요청을 보냄
   
const deletePhoto = async (photoId) => {
        const confirmed = window.confirm('정말로 이 사진을 삭제하시겠습니까?');
        if (!confirmed) return;
        try {await axios.delete(
`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos/${photoId}/update/`, 
{headers: {'Content-Type': 'application/json',}, credentials: 'include',});
             setPhotos(photos.filter(photo => photo.id !== photoId)); // 삭제된 사진을 목록에서 제거
              navigate(`/list/${wardId}`); // 삭제 후 리디렉트

        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('사진 삭제 중 문제가 발생했습니다.');
        }
    };
        const editPhoto = (photoId) => {// 수정 버튼 클릭 시 PhotoUpload 페이지로 이동
        navigate(`/patients/${patientId}/update?photoId=${photoId}&wardId=${wardId}`);
    };
    return (
        <TimelineContainer>
     // 생략
        </TimelineContainer>
    );
};
export default TimeLine;

```