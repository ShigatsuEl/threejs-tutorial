# Wael Yasmina

### Threejs 작동법

-   3개의 축으로 구성된 좌표계를 참조하고 있다.
-   x축, y축, z축으로 구성되어 있다.
-   간단한 예시
    -   영화를 녹화할 때 당연히 영화를 녹화할 적절한 장소(Scene)가 필요하고 카메라(Camera)도 필요하다. 그리고 구성요소도 필요한데 구성요소는 조명(Light)이나 객체(Object) 또는 배우(Actor) 등에 해당할 수 있다.
    -   이와 똑같은 개념을 threejs에서도 사용해야 한다. 장면 클래스의 인스턴스를 생성하여 테마를 가져오고 카메라 인스턴스도 생성해야 한다. 이 두가지는 필수요소이다.
    -   카메라는 2가지 유형이 있다.
        1. 원근 카메라
        2. 직교 카메라
    -   원근 카메라는 네가지 값이 필요하다.
        1. 수직 시야: 카메라의 길이를 통해 볼 수 있는 최대 각도
        2. 가로 세로 비율: 장소의 너비와 높이의 비율을 뜻함
        3. 근거리 클리핑: 가까이 보일 수 있는 최소 거리
        4. 원거리 클리핑: 멀리 보일 수 있는 최대 거리
    -   직교 카메라는 깊이가 계산되지 않기 때문에 2D 장면을 렌더링하는데 사용된다. 직교 카메라는 6개의 값이 필요하다.
        1. Left
        2. Right
        3. Top
        4. Bottom
        5. 근거리 클리핑
        6. 원거리 클리핑
-   요소 생성은 3가지 단계로 이루어진다.
    1. 장면에 추가하려는 3D 모양의 뼈대 또는 기하학을 생성하는 것
    2. 모양의 스킨을 만드는 것
    3. 스킨을 모양에 덮는 것
-   세 가지 빛 종류가 있다.
    1.  주변광: 환경에서 나오는 빛 ex. 방의 일광
    2.  지향성: 평행한 광선으로 모든 공간을 덮는 빛 ex. 햇빛
    3.  스포트라이트: 광원이 멀어질수록 원뿔 형태의 빛이 된다.
