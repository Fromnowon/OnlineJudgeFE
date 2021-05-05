<template>
  <!-- <el-form>
    <el-form-item :label="$t('m.Input')">
      <el-input type="textarea" v-model="input" @change="changeInput" @keyup.enter.native="changeInput"></el-input>
    </el-form-item>

    <el-form-item :label="$t('m.Output')">
    </el-form-item>
    <div v-html="text"></div>
  </el-form> -->
  <VMEditor v-model="input"/>
</template>

<script>
  import VMEditor from './VMEditor'
  export default {
    name: '',
    components: {
      VMEditor
    },
    data () {
      return {
        text: `
## Examples

<br>

行内的公式 \$E=mc\^2\$ 行内的公式

<br>

1.

\$\$c = \\pm\\sqrt\{a\^2 \+ b\^2\}\$\$

2.

\$\$x > y\$\$

3.

\$\$f\(x\) = x\^2\$\$

4.

\$\$\\alpha = \\sqrt\{1\-e\^2\}\$\$

5.

\$\$\(\\sqrt\{3x\-1\}\+\(1\+x\)\^2\)\$\$

6.

\$\$\\sin\(\\alpha\)\^\{\\theta\}=\\sum_\{i=0\}\^\{n\}\(x\^i \+ \\cos\(f\)\)\$\$

7.

\$\$\\\\dfrac\{\-b \\\\pm \\\\sqrt\{b\^2 \- 4ac\}\}\{2a\}\$\$

8.

\$\$f\(x\) = \\int_\{\-\\infty\}\^\\infty\\hat f\(\\xi\)\\,e\^\{2 \\pi i \\xi x\}\\,d\\xi\$\$

9.

\$\$\\displaystyle \\frac\{1\}\{\\Bigl\(\\sqrt\{\\phi \\sqrt\{5\}\}\-\\phi\\Bigr\) e\^\{\\frac25 \\pi\}\} = 1\+\\frac\{e\^\{\-2\\pi\}\} \{1\+\\frac\{e\^\{\-4\\pi\}\} \{1\+\\frac\{e\^\{\-6\\pi\}\} \{1\+\\frac\{e\^\{\-8\\pi\}\} \{1\+\\cdots\} \} \} \}\$\$

10.

\$\$\\displaystyle \\left\( \\sum\\_\{k=1\}\^n a\\_k b\\_k \\right\)\^2 \\leq \\left\( \\sum\\_\{k=1\}\^n a\\_k\^2 \\right\) \\left\( \\sum\\_\{k=1\}\^n b\\_k\^2 \\right\)\$\$

11.

\$\$a\^2\$\$

12.

\$\$a\^\{2\+2\}\$\$

13.

\$\$a_2\$\$

14.

\$\$\{x_2\}\^3\$\$

15.

\$\$x_2\^3\$\$

16.

\$\$10\^\{10\^\{8\}\}\$\$

17.

\$\$a_\{i,j\}\$\$

18.

\$\$_nP_k\$\$

19.

\$\$c = \\pm\\sqrt\{a\^2 \+ b\^2\}\$\$

20.

\$\$\\frac\{1\}\{2\}=0\.5\$\$

21.

\$\$\\dfrac\{k\}\{k\-1\} = 0\.5\$\$

22.

\$\$\\dbinom\{n\}\{k\} \\binom\{n\}\{k\}\$\$

23.

\$\$\\oint_C x\^3\\, dx \+ 4y\^2\\, dy\$\$

24.

\$\$\\bigcap_1\^n p   \\bigcup_1\^k p\$\$

25.

\$\$e\^\{i \\pi\} \+ 1 = 0\$\$

26.

\$\$\\left \( \\frac\{1\}\{2\} \\right \)\$\$

27.

\$\$x_\{1,2\}=\\frac\{\-b\\pm\\sqrt\{\\color\{Red\}b\^2\-4ac\}\}\{2a\}\$\$

28.

\$\$\{\\color\{Blue\}x\^2\}\+\{\\color\{YellowOrange\}2x\}\-\{\\color\{OliveGreen\}1\}\$\$

29.

\$\$\\textstyle \\sum_\{k=1\}\^N k\^2\$\$

30.

\$\$\\dfrac\{ \\tfrac\{1\}\{2\}\[1\-\(\\tfrac\{1\}\{2\}\)\^n\] \}\{ 1\-\\tfrac\{1\}\{2\} \} = s_n\$\$

31.

\$\$\\binom\{n\}\{k\}\$\$

32.

\$\$0\+1\+2\+3\+4\+5\+6\+7\+8\+9\+10\+11\+12\+13\+14\+15\+16\+17\+18\+19\+20\+\\cdots\$\$

33.

\$\$\\sum_\{k=1\}\^N k\^2\$\$

34.

\$\$\\textstyle \\sum_\{k=1\}\^N k\^2\$\$

35.

\$\$\\prod_\{i=1\}\^N x_i\$\$

36.

\$\$\\textstyle \\prod_\{i=1\}\^N x_i\$\$

37.

\$\$\\coprod_\{i=1\}\^N x_i\$\$

38.

\$\$\\textstyle \\coprod_\{i=1\}\^N x_i\$\$

39.

\$\$\\int_\{1\}\^\{3\}\\frac\{e\^3\/x\}\{x\^2\}\\, dx\$\$

40.

\$\$\\int_C x\^3\\, dx \+ 4y\^2\\, dy\$\$

41.

\$\$\{\}_1\^2\\!\\Omega_3\^4\$\$

<br>  
`,
        input: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.input = this.text
      })
    }
  }
</script>

<style scoped>
</style>
