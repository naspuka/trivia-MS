gp = int(input('your gp :'))

def my_gp_scorer(gp):
    if gp<=5.0 and gp>=4.5:
        grade = 'first class'
    elif gp < 4.5:
        grade = 'second class'
    else:
        grade = 'third class'
    print(grade)
